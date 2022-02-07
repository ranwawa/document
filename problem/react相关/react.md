### 1. 学习并了解FaCC(20211223)

#### 问题描述

一般在jsx语法中,要么是放一个标签

要么

```react
 <StyledRadioGroup
              name="payment"
              value={radioGroupValue}
              onChange={this.onRadioButtonChanged}
            >
              {RadioButton => (
                <FormGroup>
                  {paymentMethodIds.map(paymentMethodId => {
                    const {
                      icon: Icon,
                      label,
                      name,
                      desc,
                    } = paymentMethodId === PaymentMethods.CASH.id
                      ? paymentMethodOptions.CASH
                      : paymentMethodOptions.ONLINE;

                    const active = paymentMethodId === selectedPaymentMethodId;
                    console.log(123, RadioButton);

                    return (
                      <FormItem
                        key={name}
                        style={{
                          flexDirection: 'column',
                          marginBottom: '0.5em',
                        }}
                      >
                        <Box>
                          <RadioButton
                            value={name}
                            data-cy={`payment-radio-${name}`}
                          >
                            <Con>
                              <Icon
                                color={active ? primary.main : nobel[700]}
                              />
                            </Con>
                            <RadioLabel checked={active}>{t(label)}</RadioLabel>
                          </RadioButton>
                        </Box>
                        <RadioDesc
                          {...(paymentMethodId === PaymentMethods.ONLINE.id && {
                            'data-for': 'checkout-tool-tip',
                            'data-tip': 'tooltip',
                            ref: ref => {
                              this.tooltipTargetHTMLElementRef = ref;
                            },
                          })}
                          checked={active}
                        >
                          {t(desc)}
                        </RadioDesc>
                      </FormItem>
                    );
                  })}
                </FormGroup>
              )}
            </StyledRadioGroup
```

