// import express from 'express'

// const app = express()

// app.listen(3000)

// console.log('App listening and updating')

// export default app

/* ----------------------------- */

import http from 'http'
// import fs from 'fs'

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
	// const url = req.url.slice(1)
	const method = req.method

	switch (req.url) {
	case '/':
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/html')
		res.write('<form action="/message" method="POST">')
		res.write('Test URL: <input type="text" name="url">')
		res.write('<input type="submit" value="submit">')
		res.end('</form>')
		break

	case '/message':
		if (method.toLowerCase() === 'post') {
			const body = []
      
			req.on('data', (chunk) => {
				body.push(chunk)
			})
			req.on('end', () => {
				const parsedBody = Buffer.concat(body).toString()
				const message = parsedBody.split('=')[1]
				res.statusCode = 200
				res.setHeader('Content-Type', 'text/html')
				res.end(`<h1>Hello from ${message}</h1>`)
			})
		}
		break

	default:
		res.statusCode = 404
		res.setHeader('Content-Type', 'text/html')
		res.end('<h1>Not Found</h1>')
		break
	}
})

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})