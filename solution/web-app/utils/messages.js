/*
 * @Author: Jipu Li 
 * @Date: 2022-03-20 00:03:49 
 * @Last Modified by: Jipu Li
 * @Last Modified time: 2022-04-19 00:37:28
 */

const moment = require('moment')

function formatMessage(name, text) {
  return {
    name: '007',
    text,
    time: moment().format('h:mm a')
  }
}

module.exports = formatMessage