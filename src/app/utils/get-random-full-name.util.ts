const fullNames: string[] = [
    "John Doe",
    "Jane Smith",
    "Emily Johnson",
    "Mary Brown",
    "David Jones",
    "Sarah Miller",
    "Robert Wilson",
    "Linda Garcia"
]

export function getRandomFullName(): string{
    const randomIndex = Math.floor(Math.random() * fullNames.length);
    return fullNames[randomIndex];
}

// Пример использования
const randomFullName = getRandomFullName();
console.log(randomFullName);