export const GenerateUrl = (uuid : string) => {
    const baseURL = import.meta.env.VITE_BASE_URL_FRONT;
    return `${baseURL}/view/${uuid}`
}