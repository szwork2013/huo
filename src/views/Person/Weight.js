import React, { Component } from 'react';
import { InputItem, Toast, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import request from 'superagent-bluebird-promise';

class Weight extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="page">
        <InputItem
          {...getFieldProps('weight', {
            initialValue: '',
          })}
          clear
          placeholder="请输入吨位"
          className="weight-input"
          type="number"
        />
        <InputItem
          {...getFieldProps('cubic', {
            initialValue: '',
          })}
          clear
          placeholder="请输入方量"
          className="weight-input"
          type="number"
        />
        <WingBlank>
          <Button
            className="submit-btn"
            type="warning"
            onClick={this.handleSubmit}>
            确定
          </Button>
        </WingBlank>
      </div>
    );
  }

 // 修改吨位放量
  handleSubmit() {
    location.href = '/#/person';
    const uuid = sessionStorage.getItem('uuid');
    const weight = this.props.form.getFieldProps('weight').value;
    const cubic = this.props.form.getFieldProps('cubic').value;

    if (weight === undefined) {
      Toast.fail('请填写吨位');
      return;
    }
    if (cubic === undefined) {
      Toast.fail('请填写吨位');
      return;
    }
    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    const data = {
      data: {
        cubic: cubic.toString(),
        weight: weight.toString(),
        type: 'DRIVER_CAR_WEIGHT',
      },
      service: 'SERVICE_DRIVER',
      uuid,
      timestamp: '',
      signatures: '',
    };
    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then((res) => {
      if (res.success) {
        var driverInfo = sessionStorage.getItem('driverInfo');
        driverInfo.weight = weight.toString();
        driverInfo.cubic = cubic.toString();
        Toast.success(res.msg);
        this.context.router.push('/person');

      } else {
        Toast.fail(res.msg);
      }
    });
  }
}
const _Weight = createForm()(Weight);
export default _Weight;
