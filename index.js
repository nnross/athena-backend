const app = require('./app')
const logger = require('./utils/logger')

const port = process.env.PORT

app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}/`)
})
