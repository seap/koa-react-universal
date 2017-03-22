import 'path' from 'path'
import ip from 'ip'

// env configuration
export const env = process.env.NODE_ENV || 'development'

// path configuration
export const path_base = path.resolve(__dirname, '.')
export const dir_client = 'src'
export const dir_dist = 'dist'
export const dir_public = 'dir_public'

// server configuration
export const server_host = ip.address()
export const server_port = process.env.PORT || 3000
