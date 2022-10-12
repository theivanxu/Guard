import {
  GuardEventsKebabToCamelType,
  Lang,
  GuardProps,
  GuardLocalConfig,
  AuthenticationClientOptions,
  CodeAction,
  ApiCode,
  GuardModuleType,
  LoginMethods,
  OIDCConnectionMode,
  SocialConnectionProvider,
  Protocol,
  RegisterMethods,
  GuardMode,
  InputMethod,
  GuardPageSene,
  EmailScene
} from '@authing/react-ui-components'

export type ICodeAction = `${CodeAction}`
export type IApiCode = `${ApiCode}`
export type IGuardModuleType = `${GuardModuleType}`
export type ILoginMethod = `${LoginMethods}`
export type IOIDCConnectionMode = `${OIDCConnectionMode}`
export type ISocialConnectionProvider = `${SocialConnectionProvider}`
export type IProtocol = `${Protocol}`
export type IRegisterMethod = `${RegisterMethods}`
export type IGuardMode = `${GuardMode}`
export type IInputMethod = `${InputMethod}`
export type IGuardPageSene = `${GuardPageSene}`
export type IEmailScene = `${EmailScene}`

export type GuardEventListeners = {
  [key in keyof GuardEventsKebabToCamelType]: Exclude<
    Required<GuardEventsKebabToCamelType>[key],
    undefined
  >[]
}

export type CodeChallengeMethod = 'S256' | 'plain'

export type Align = 'top' | 'middle' | 'bottom'

export type Justify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'

export interface IGuardConfig extends GuardLocalConfig {
  // replace socialConnections
  socialConnectionList?: ISocialConnectionProvider[]

  // replace defaultLoginMethod
  loginMethod?: ILoginMethod

  // replace loginMethods
  loginMethodList: ILoginMethod[]

  // replace defaultRegisterMethod
  registerMethod?: IRegisterMethod

  // replace registerMethods
  registerMethodList?: IRegisterMethod[]

  // replace contentCss
  contentCSS?: string
}

export interface GuardOptions extends GuardProps {
  appId: string
  host?: string
  redirectUri?: string
  mode?: IGuardMode
  defaultScene?: IGuardModuleType
  tenantId?: string
  lang?: Lang
  isSSO?: boolean
  config?: Partial<IGuardConfig> // 兼容 4.0 的 config
  authClientOptions?: AuthenticationClientOptions
  align?: Align
  justify?: Justify
}

export interface StartWithRedirectOptions {
  codeChallengeMethod?: CodeChallengeMethod
  scope?: string
  redirectUri?: string
  state?: string
  responseType?:
    | 'code'
    | 'code id_token token'
    | 'code id_token'
    | 'code token'
    | 'id_token token'
    | 'id_token'
    | 'none'
  responseMode?: 'query' | 'fragment' | 'form_post'
  nonce?: string
}

export * from '@authing/react-ui-components'
