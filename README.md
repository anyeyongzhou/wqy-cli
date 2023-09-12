# wqy-cli
自己创建的一个脚手架工具，帮助创建vue项目

Usage: index [options] [command]

Options:
  -v, --version                 output the current version
  -d --dest <dest>              a destination folder,例如：-d /src/components
  -f --framework <framework>    your framework
  -h, --help                    display help for command

Commands:
  create <project> [others...]  clone repository into a folder
  addcpn <name> [others...]     add vue component,例如:wqy addcpn HelloWorld -d src/components
  addpage <page> [others...]    add vue page and router config,例如:wqy addpage Home [-d src/pages]
  addstore <store> [others...]  add vue's vuex store ,例如:wqy addstore congif [-d src/store]
  help [command]                display help for command
