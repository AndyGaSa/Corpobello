/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Form, Input, Button, Select, Calendar,
} from 'antd';
import styles from '../styles/Reserve.module.css';

const { Option } = Select;

export default function Reserves() {
  const [serviceValue, setService] = useState('');
  async function onServiceChange(value) {
    console.log(`esto es lo que llega: ${value}`);
    await setService(value);
    console.log(`esto es lo que setea: ${serviceValue}`);
  }
  function onPanelChange(value) {
    console.log(value);
  }
  return (
    <section className={styles.Reserves}>
      <div className={styles.ReservesFormDiv}>
        <h2 className={styles.h2}>RESERVA YA</h2>
        <Form className={styles.ReservesForm}>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input className={styles.ReserveInput} placeholder="Nombre y Apellidos" />
          </Form.Item>
          <Form.Item name="tel" rules={[{ required: true }]}>
            <Input className={styles.ReserveInput} placeholder="Telefono" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input className={styles.ReserveInput} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="service"
            rules={[{ required: true }]}
          >
            <Select
              className={styles.SELECTOR}
              placeholder="Servicio"
              onChange={(event) => onServiceChange(event)}
              size="large"
            >
              <Option value="massage">Masaje</Option>
              <Option value="haircut">Peluqueria</Option>
              <Option value="spa">Spa</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className={styles.ReserveButton} type="primary" htmlType="submit">
              RESERVAR
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.ReservesCalendar}>
        <Calendar
          locale="es_ES"
          className={styles.Calendar}
          onSelect={onPanelChange}
        />
      </div>
    </section>
  );
}
