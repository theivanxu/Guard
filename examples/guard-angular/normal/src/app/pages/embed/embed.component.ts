import { Component } from '@angular/core'

import { AuthenticationClient, GuardService, RefreshToken, User } from '@authing/guard-angular'

@Component({
  selector: 'embed-container',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css']
})
export class EmbedComponent {
  constructor(private guard: GuardService) {}

  langCache = ''

  ngOnInit() {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    this.guard.client.start('#authing-guard-container').then((userInfo: User) => {
      console.log(userInfo)
    })

  }

  changeContentCSS() {
    this.guard.client.changeContentCSS('body {background: blue}')
  }

  startRegister() {
    this.guard.client.startRegister()
  }

  logout() {
    // 登出后的回调地址请在 Authing 控制台「应用详情」-「应用配置」-「登出回调 URL」中配置
    this.guard.client.logout()
  }

  async getUserInfo() {
    const userInfo: User | null = await this.guard.client.trackSession()
    console.log('userInfo: ', userInfo)
  }

  async refreshToken() {
    const authClient: AuthenticationClient = await this.guard.client.getAuthClient()
    const refreshedToken: RefreshToken = await authClient.refreshToken()
    console.log('refreshedToken: ', refreshedToken)
  }

  changeLang(event: any) {
    this.langCache = event?.target?.value
    this.guard.client.changeLang(event?.target?.value)
  }
}
