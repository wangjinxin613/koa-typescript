// const http = require('http')
// const qs = require('querystring')

// export function httpRequest (request) {
//   if (request.method && (request.method === 'get' || request.method === 'GET') && request.data) {
//     // Object.assign(request.headers, {
//     // })
//     request.path = request.path + qs.stringify(request.data)
//   }
//   var req = http.request(request, (res) => {
//     return new Promise((resolve, reject) => {
//       var content = ''
//       res.setEncoding('utf-8')
//       res.on('data', (chunk) => {
//         content += chunk
//       })
//       res.on('end', () => {
//         resolve(content)
//       })
//     })
//   })

//   if (request.method && (request.method === 'post' || request.method === 'POST') && request.data) {
//     // Object.assign(request.headers, {
//     // })
//     req.write(qs.stringify(request.data))
//   }
// }
