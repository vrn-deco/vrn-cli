/*
 * @Author: Cphayim
 * @Date: 2019-08-01 14:23:07
 * @LastEditTime: 2020-10-03 02:41:27
 * @Description: 检查更新
 */

import updater from 'pkg-updater'
import { ROOT_DIR } from '@/constants'
import { join } from 'path'
import ConfigService from '@/services/config.service'

export function checkUpdate(): Promise<void> {
  const pkg = require('@/../package')
  return updater({
    pkg,
    // 自定义 registry
    registry: new ConfigService().getAll().npmrepo ?? 'https://registry.npmjs.org/',
    // 自定义请求的 dist-tag，默认是 latest
    tag: 'latest',
    // 自定义检查间隔，默认是 1h
    checkInterval: 1,
    // 自定义更新提示信息
    updateMessage:
      `发现新版本: <%=colors.yellow(current + " -> " + latest) %> \n\n` +
      '请将 <%=colors.yellow(name)%> 更新到最新版本后使用: \n\n' +
      'macOS / centOS / ubuntu: <%=colors.cyan("sudo "+ command)%>\n' +
      'windows: <%=colors.cyan(command)%>',
    // 自定义强制更新的版本更新级别，默认是 major
    level: 'patch', // major | minor | patch
    logFile: join(ROOT_DIR, 'pkg-updater.json'),
  })
}
