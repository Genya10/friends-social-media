/*module.exports=({env})=>({
// Настройка плагина strapi-plugin-populate-deep
"strapi-plugin-populate-deep": {
    config: {
    // Устанавливает глубину вложенности по умолчанию для популяции данных
        defaultDepth:5,
    },
},
 // Настройка Socket.IO
io: {
    enabled: true,//Включает Socket.IO
    config: {
        IOServerOptions :{
            cors:{origin: "http://localhost:3000",//Разрешает соединения с указанного источника
            methods: ["GET", "POST"]},//Разрешает использование методов GET и POST
        },
        contentTypes: {
            message: "*",//Указывает, что для типа данных 'message' будут поддерживаться все события
            chat:["create"],//Указывает, что для типа данных 'chat' будет поддерживаться событие 'create'
        },
        events: [
            {
            //Событие подключения нового клиента
                name: "connection",
                //функция-обработчик для события в Socket.IO.
                handler: ({strapi}, socket) => {
                     // Логирует информацию о новом подключении
                    strapi.log.info(`[io] new connection with id ${socket.id}`);
                //Обработка события 'client-message' от клиента
                    socket.on("client-message", async (messageData)=> {
                    // Отправляет полученное сообщение обратно всем клиентам
                    strapi.$io.raw("server-message", messageData)
                    });
                },
            },
        ],
    },
 },
});*/

module.exports = ({ env }) => ({
    // Настройка плагина strapi-plugin-populate-deep
    "strapi-plugin-populate-deep": {
      config: {
        // Устанавливает глубину вложенности по умолчанию для популяции данных
        defaultDepth: 5,
      },
    },
    // Настройка Socket.IO
    io: {
      enabled: true, // Включает Socket.IO
      config: {
        IOServerOptions: {
          cors: {
            origin: "http://localhost:3000", // Разрешает соединения с указанного источника
            methods: ["GET", "POST"], // Разрешает использование методов GET и POST
          },
        },
        contentTypes: [
          'api::message.message',//Использование строки вместо объекта для указания типов данных
          {
            uid: 'api::chat.chat',
            actions: ['create'], //Указание массива для действий
          },
        ],
        events: [
          {
            // Событие подключения нового клиента
            name: "connection",
            // Функция-обработчик для события в Socket.IO.
            handler: ({ strapi }, socket) => {
              // Логирует информацию о новом подключении
              strapi.log.info(`[io] new connection with id ${socket.id}`);
              // Обработка события 'client-message' от клиента
              socket.on("client-message", async (messageData) => {
                // Отправляет полученное сообщение обратно всем клиентам
                strapi.$io.raw("server-message", messageData);
              });
            },
          },
        ],
      },
    },
  });