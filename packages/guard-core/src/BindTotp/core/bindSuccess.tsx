import { Form, Checkbox, Typography } from 'shim-antd'

import { React } from 'shim-react'

import { i18n } from '../../_utils'

import SubmitButton from '../../SubmitButton'

import { useGuardIsAuthFlow } from '../../_utils/context'

import { authFlow, BindTotpBusinessAction } from '../businessRequest'

const { Paragraph } = Typography

const { useRef } = React

export interface BindSuccessProps {
  onBind: any
  secret: string
}

export const BindSuccess: React.FC<BindSuccessProps> = ({ secret, onBind }) => {
  // const [isSaved, setIsSaved] = useState(false)
  const submitButtonRef = useRef<any>(null)

  const [form] = Form.useForm()

  const { t } = i18n

  const isAuthFlow = useGuardIsAuthFlow()

  const bindSuccess = async () => {
    submitButtonRef.current?.onSpin(true)

    await form.validateFields()

    if (isAuthFlow) {
      const { data, isFlowEnd, onGuardHandling } = await authFlow(
        BindTotpBusinessAction.ConfirmTotpRecoveryCode,
        {}
      )
      submitButtonRef.current?.onSpin(false)
      if (isFlowEnd) {
        onBind(data)
      } else {
        // TODO 需要 onError 抖动吗 当 from 表单校验通过的时候 onError 是没有意义的
        submitButtonRef.current?.onError()
        onGuardHandling?.()
      }
    } else {
      submitButtonRef.current?.onSpin(false)
      onBind()
    }
  }

  return (
    <>
      <p className="authing-g2-mfa-title">{t('common.totpText1')}</p>
      <p className="authing-g2-mfa-tips">{t('common.totpText2')}</p>

      <div className="g2-mfa-bindTotp-copySecret">
        <Paragraph copyable>{secret}</Paragraph>
      </div>

      <Form
        form={form}
        onFinish={bindSuccess}
        style={{ width: '100%' }}
        onFinishFailed={() => submitButtonRef.current?.onError()}
      >
        <Form.Item
          className="authing-g2-input-form g2-mfa-totp-verify-input"
          name="remember"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject()
                }
                return Promise.resolve()
              }
            }
          ]}
          valuePropName="checked"
        >
          <Checkbox className="g2-mfa-bindTotp-secretSave">{t('login.rememberedSecret')}</Checkbox>
        </Form.Item>

        <SubmitButton
          text={t('common.bindSuccess')}
          ref={submitButtonRef}
          className="g2-mfa-submit-button-new"
        />
      </Form>
    </>
  )
}
