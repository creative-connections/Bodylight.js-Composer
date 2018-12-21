const FtpDeploy = require('ftp-deploy')
const dotenv = require('dotenv').config({ path: '.env.dev' })

const ftpDeploy = new FtpDeploy()
const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_SERVER,
  port: 21,
  localRoot: __dirname + '/build',
  remoteRoot: process.env.FTP_DEST,
  include: ['*', '**/*'],
  deleteRemote: true,
  forcePasv: true
}

ftpDeploy.deploy(config)
  .then(() => {
    console.log(`Deploy to ftp://${process.env.FTP_USER}@${process.env.FTP_SERVER}${process.env.FTP_DEST} successful`)
  })
  .catch(err => {
    console.log(`Deploy to ftp://${process.env.FTP_USER}@${process.env.FTP_SERVER}${process.env.FTP_DEST} failed`)
    console.error(err)
  })