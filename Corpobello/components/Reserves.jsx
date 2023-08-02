import { PropTypes } from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from 'next-stripe/client';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from 'use-media-antd-query';
import { Form, Input, Button, Select, Calendar, TimePicker } from 'antd';
import moment from 'moment-business-days';
import loadReserves from '../redux/actions/loadReserves';
import styles from '../styles/Reserve.module.css';

const { Option } = Select;

export default function Reserves() {
  const dispatch = useDispatch();
  const colSize = useMediaQuery();
  const [name, setName] = useState('');
  const [tel, setTel] = useState(0);
  const [email, setEmail] = useState('');
  const [currentDay, setCurrentDay] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [disabledDates, setDisabledDates] = useState([]);
  const [service, setService] = useState('');
  const [personal, setPersonal] = useState('');
  const [screenIsBig, setScreenSize] = useState(true);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinutes, setSelectedMinutes] = useState('');
  const reserves = useSelector((store) => store.reserves);
  async function sendReserve() {
    try {
      const session = await createCheckoutSession({
        success_url: window.location.href,
        cancel_url: window.location.href,
        line_items: [{ price: 'price_1JZuJhFXhsus6ZXxbXMOeKsX', quantity: 1 }],
        payment_method_types: ['card'],
        mode: 'payment',
      });
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
      );
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: session.id });
      }
      await axios.post('/api/reserveHandler', {
        name,
        date: {
          day: currentDay,
          hour: selectedHour,
          minute: selectedMinutes,
        },
        tel,
        email,
        service,
        personal,
      });
      Notiflix.Report.success(
        'Genial!',
        'Se ha hecho tu reserva con exito!',
        'Ok'
      );
    } catch (error) {
      Notiflix.Report.failure('Error!', { error }, 'Ok');
    }
  }
  function onServiceChange(value) {
    setService(value);
  }
  function onPersonalChange(value) {
    setPersonal(value);
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  }

  function disabledHours() {
    return range(0, 8) + range(14, 15) + range(21, 24);
  }
  function disabledMinutes(h) {
    const todayReserves = reserves?.find(
      (reserve) => reserve?.day === currentDay
    );
    const todayHours = todayReserves?.hoursAndMinutes?.map((hours) =>
      Object?.entries(hours)
    );
    const todayBlockedHours = todayHours?.filter((hour) => +hour[0][0] === h);
    let todayBlockedMinutes = todayBlockedHours?.map((mins) => mins[0][1][0]);
    const todayBlockedMinutes2 = todayBlockedHours?.map(
      (mins) => mins[0][1][1]
    );
    if (todayBlockedMinutes2?.length === 1) {
      todayBlockedMinutes = todayBlockedMinutes.concat(todayBlockedMinutes2);
    }
    if (h === 13) {
      todayBlockedMinutes?.push(30);
      return todayBlockedMinutes;
    }
    return todayBlockedMinutes;
  }
  function onPanelChange(value) {
    setCurrentDay(value.format().substring(0, 10));
  }
  function disabledDate(current) {
    if (disabledDates?.length > 0) {
      return disabledDates?.find(
        (date) =>
          date === moment(current).format('YYYY-MM-DD') ||
          !moment(current.format('YYYY-MM-DD'), 'YYYY-MM-DD').isBusinessDay() ||
          current.isBefore(moment())
      );
    }
    return (
      !moment(current.format('YYYY-MM-DD'), 'YYYY-MM-DD').isBusinessDay() ||
      current.isBefore(moment())
    );
  }
  function getAndSetReserves() {
    dispatch(loadReserves());
  }
  useEffect(() => {
    if (reserves.length > 0) {
      let reservesDate = reserves.filter((reserve) => reserve.freeTime < 1);
      reservesDate = reservesDate.map((reserve) => reserve.day);
      setDisabledDates(reservesDate);
    }
  }, [reserves]);
  useEffect(() => {
    getAndSetReserves();
  }, []);
  useEffect(() => {
    setScreenSize(
      colSize === 'xxl' ||
        colSize === 'xl' ||
        colSize === 'lg' ||
        colSize === 'md'
    );
  }, [colSize]);
  return (
    <section className={styles.ReservesBg}>
      <div className={styles.Reserves}>
        <div className={styles.ReservesCalendar}>
          <Calendar
            fullscreen={screenIsBig}
            locale="es_ES"
            className={styles.Calendar}
            onSelect={(value) => onPanelChange(value)}
            disabledDate={(current) => disabledDate(current)}
          />
        </div>
        <div className={styles.ReservesFormDiv}>
          <h2 className={styles.h2}>RESERVA YA</h2>
          <Form className={styles.ReservesForm}>
            <Form.Item name="nombre" rules={[{ required: true }]}>
              <Input
                className={styles.ReserveInput}
                placeholder="Nombre y Apellidos"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Item>
            <Form.Item name="telefono" rules={[{ required: true }]}>
              <Input
                type="number"
                className={styles.ReserveInput}
                placeholder="Teléfono"
                onChange={(event) => setTel(event.target.value)}
              />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true }]}>
              <Input
                className={styles.ReserveInput}
                placeholder="E-mail"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>
            <Form.Item name="servicio" rules={[{ required: true }]}>
              <Select
                aria-label="Service selector"
                placeholder="Servicio"
                onChange={(event) => onServiceChange(event)}
              >
                <Option value="massage">Masaje</Option>
                <Option value="haircut">Peluqueria</Option>
                <Option value="spa">Spa</Option>
              </Select>
            </Form.Item>
            <Form.Item name="personal" rules={[{ required: true }]}>
              <Select
                aria-label="Personal selector"
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
              }}
              minuteStep={30}
              disabledHours={() => disabledHours()}
              disabledMinutes={(h) => disabledMinutes(h)}
              hideDisabledOptions
            />
            <Form.Item>
              <Button
                className={styles.ReserveButton}
                type="primary"
                onClick={() => sendReserve()}
              >
                RESERVAR
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

Reserves.propTypes = {
  prices: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
