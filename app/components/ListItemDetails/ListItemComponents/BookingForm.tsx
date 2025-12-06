'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './CamperDetails.module.css';
import { Button } from '../../Button/Button';
import toastMessage, { MyToastType } from '@/app/services/messageService';
import { CamperData } from '@/app/services/api/api.types';
import { DatePickerField } from '../../DatePickerField/DatePickerField';

interface Props {
  camper: CamperData;
}

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  bookingDate: Yup.date().required('Required'),
  comment: Yup.string().max(300, 'Too long'),
});

export function BookingForm({ camper }: Props) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>

      <Formik
        initialValues={{
          name: '',
          email: '',
          bookingDate: '',
          comment: '',
        }}
        validationSchema={BookingSchema}
        onSubmit={(values, actions) => {
          const formatted = new Date(values.bookingDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
          toastMessage(MyToastType.success, `${camper.name} was booked on ${formatted}. Enjoi your trip!`);
          actions.resetForm();
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.fieldWrapper}>
              <Field name="name" placeholder="Name*" className={css.input} />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.fieldWrapper}>
              <Field name="email" placeholder="Email*" className={css.input} />
              <ErrorMessage name="email" component="div" className={css.error} />
            </div>

            <div className={css.fieldWrapper}>
              <DatePickerField value={values.bookingDate} onChange={date => setFieldValue('bookingDate', date)} />
              <ErrorMessage name="bookingDate" component="div" className={css.error} />
            </div>

            <div className={css.fieldWrapper}>
              <Field as="textarea" id="comment" className={css.input} name="comment" placeholder="Comment" rows={6} />
              <ErrorMessage name="comment" component="div" className={css.error} />
            </div>

            <Button label="Send" type="submit" variant="primary" isDisabled={isSubmitting} className={css.submit} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
