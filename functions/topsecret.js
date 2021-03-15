exports.handler = async function (event, context) {
  if(event.httpMethod !== 'POST') {
    return {
        headers: {"Content-Type": "text/plain",
        'Access-Control-Allow-Origin': '*'},
        statusCode:405,
        body: 'Only POST request allowed!'
        }
    }
    const body = JSON.parse(event.body)
    if (body.username === "johndoe" && body.password == "qwerty") {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "The sky is blue.", status: "success" })
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "You are not authorized to access this data.", status: "failure" })
      }
    }
  }