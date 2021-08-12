export const sendForm = async (data) => {
  const response = await fetch("/api/send", {
    method: "POST",
    body: JSON.stringify(data),
  })
  const { status } = await response.json()
  return status
}
