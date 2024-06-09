import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

// Интерфейс для событий WebSocket
interface WebSocketEvent {
  operation: "invalidate" | "update";
  entity: string;// Название сущности, которая подвергается операции
  id?: string;
  payload?: Record<string, unknown>;// Дополнительные данные для обновления
}

// Интерфейс для обновления данных
interface UpdateData {
  id: string;
  [key: string]: any;
}

const useReactQuerySocket = () => {
  const queryClient = useQueryClient();

  const socket = useRef<Socket>();// Создаем ref для хранения сокета

  useEffect(() => {
     // Подключаемся к WebSocket серверу при монтировании компонента
    socket.current = io(process.env.BACK_URL as string);// Используем URL сервера из переменной окружения
    // Логируем сообщение при успешном подключении
    socket.current.on("connect", () => {
      console.log("connected tosocket.io server");
    });
    // Обрабатываем событие "server-message" от сервера
    socket.current.on("server-message", (data: WebSocketEvent) => {
        // Инвалидируем кэшированные данные на основе сущности и её ID
      queryClient.invalidateQueries({
        queryKey: [data.entity, data.id].filter(Boolean),//Фильтруем,чтобы убрать undefined если id отсутствует
      });
    });
    // Обрабатываем событие "update" от сервера
    socket.current.on("update", (data: WebSocketEvent) => {
        // Обновляем кэшированные данные на основе сущности и её ID
      queryClient.setQueriesData<UpdateData[] | UpdateData | undefined>(
        { queryKey: [data.entity, data.id] },// Ключ кэша для обновления
        (oldData) => {
            // Функция для обновления данных
          const update = (entity: UpdateData) =>
            entity.id === data.id ? { ...entity, ...data.payload }:entity;//Обновляем данные сущности,если ID совпадает
          return Array.isArray(oldData)
            ? oldData.map(update)// Если данные в виде массива, обновляем каждый элемент
            : update(oldData as UpdateData);// Если данные в виде объекта, обновляем его
        }
      );
    });
     // Отключаемся от сервера при размонтировании компонента
    return () => {
      socket.current?.disconnect();
    };
  }, [queryClient]);

  // Функция для отправки сообщений на сервер
  const send = (input: WebSocketEvent) => {
    socket.current?.emit("client-message", input);
  };
  return send; //Возвращаем функцию для отправки сообщений
};

//connect: логирует сообщение при успешном подключении.
//server-message: обрабатывает сообщение от сервера для инвалидирования кэша.
//update: обрабатывает сообщение от сервера для обновления данных в кэше.
