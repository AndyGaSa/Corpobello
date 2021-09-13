/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from 'use-media-antd-query';
import {
  Form, Input, Button, Select, Calendar, TimePicker,
} from 'antd';
import moment from 'moment-business-days';
import loadReserves from '../redux/actions/actionCreators';
import styles from '../styles/Reserve.module.css';

const { Option } = Select;

export default function Reserves() {
  const dispatch = useDispatch();
  const colSize = useMediaQuery();

  const [disabledDates, setDisabledDates] = useState([]);
  const [serviceValue, setService] = useState('');
  const [screenIsBig, setScreenSize] = useState(true);
  const [telStatus, setTelStatus] = useState('');
  const [telHelp, setTelHelp] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinutes, setSelectedMinutes] = useState('');
  const reserves = useSelector((store) => store.reserves);
  async function onServiceChange(value) {
    await setService(value);
  }
  async function onPersonalChange(value) {
    await setService(value);
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  }

  function disabledHours() {
    const hours = range(0, 8) + range(14, 15) + range(21, 24);
    console.log('hours', hours);
    return hours;
  }

  function disabledMinutes(h) {
    if (h === 13) {
      return range(15, 60);
    } if (h === 9) {
      return range(0, 31);
    }
    console.log('min', []);
    return [];
  }
  function onPanelChange(value) {
    console.log(value.format('LLL'));
  }
  function disabledDate(current) {
    return disabledDates.find((date) => date === moment(current).format('YYYY-MM-DD') || !moment(current.format('YYYY-MM-DD'), 'YYYY-MM-DD').isBusinessDay() || current.isBefore(moment()));
  }
  async function getAndSetReserves() {
    await dispatch(loadReserves());
  }
  useEffect(() => {
    if (reserves.length > 0) {
      const reservesDate = reserves.map((reserve) => reserve.date.day);
      setDisabledDates(reservesDate);
    }
  }, [reserves]);
  useEffect(() => {
    getAndSetReserves();
  }, []);
  useEffect(() => {
    setScreenSize(colSize === 'xxl' || colSize === 'xl' || colSize === 'lg' || colSize === 'md');
  }, [colSize]);
  return (
    <section className={styles.ReservesBg}>
      <div className={styles.Reserves}>
        <div className={styles.ReservesCalendar}>
          <Calendar
            fullscreen={screenIsBig}
            locale="es_ES"
            className={styles.Calendar}
            onSelect={onPanelChange}
            disabledDate={(current) => disabledDate(current)}
          />
        </div>
        <div className={styles.ReservesFormDiv}>
          <h2 className={styles.h2}>RESERVA YA</h2>
          <Form className={styles.ReservesForm}>
            <Form.Item name="nombre" rules={[{ required: true }]}>
              <Input className={styles.ReserveInput} placeholder="Nombre y Apellidos" />
            </Form.Item>
            <Form.Item name="telêfono" rules={[{ required: true }]}>
              <Input type="number" help={telHelp} className={styles.ReserveInput} placeholder="Teléfono" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true }]}>
              <Input className={styles.ReserveInput} placeholder="E-mail" />
            </Form.Item>
            <Form.Item
              name="servicio"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Servicio"
                onChange={(event) => onServiceChange(event)}
              >
                <Option value="massage">Masaje</Option>
                <Option value="haircut">Peluqueria</Option>
                <Option value="spa">Spa</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="personal"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Personal"
                onChange={(event) => onPersonalChange(event)}
              >
                <Option value="alicia">Alicia</Option>
                <Option value="marisol">Marisol</Option>
              </Select>
            </Form.Item>
            <TimePicker
              format="HH:mm"
              defaultValue={moment('08:00', 'HH:mm')}
              showNow={false}
              onSelect={(value) => {
                const timeString = moment(value).format('HH:mm');
                setSelectedHour(timeString.substring(0, 2));
                setSelectedMinutes(timeString.substring(3, 5));
                console.log('minutos', timeString.substring(3, 5));
              }}
              minuteStep={30}
              disabledHours={disabledHours}
              disabledMinutes={disabledMinutes}
              hideDisabledOptions
            />
            <Form.Item>
              <Button className={styles.ReserveButton} type="primary" htmlType="submit">
                RESERVAR
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}
