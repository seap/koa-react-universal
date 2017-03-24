import path from 'path'
import ip from 'ip'

// env configuration
export const env = process.env.NODE_ENV || 'development'

// path configuration
const dir_client = 'src'
const dir_dist = 'dist'
const dir_public = 'public'
export const paths = {
  root: path.resolve(__dirname, '.'),
  client: path.resolve(__dirname, dir_client),
  public: path.resolve(__dirname, dir_public),
  dist: path.resolve(__dirname, dir_dist),
  compilerPublic: '/'
}

// server configuration
export const server_host = ip.address()
export const server_port = process.env.PORT || 3000

//
export const compiler_public_path = '/'
