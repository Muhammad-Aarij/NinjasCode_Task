import React from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Use 'Yup' for the validation schema

// Define the validation schema using Yup
const userSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
});

export const MyReactNativeForm = () => (
  <Formik
    initialValues={{ email: '', firstName: '', lastName: '' }}
    onSubmit={values => console.log(values)}
    validationSchema={userSchema} // Use the validation schema
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder='Enter Email Address'
          style={{ marginVertical: 10, backgroundColor: "white", width: 300, borderRadius: 30, paddingLeft: 20 }}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
        {touched.email && errors.email ? <Text style={{ color: 'black' }}>{errors.email}</Text> : null}

        <TextInput
          placeholder='Enter First Name'
          style={{ marginVertical: 10, backgroundColor: "white", width: 300, borderRadius: 30, paddingLeft: 20 }}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          value={values.firstName}
        />
        {touched.firstName && errors.firstName ? <Text style={{ color: 'black' }}>{errors.firstName}</Text> : null}

        <TextInput
          placeholder='Enter Last Name'
          style={{ marginVertical: 10, backgroundColor: "white", width: 300, borderRadius: 30, paddingLeft: 20 }}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          value={values.lastName}
        />
        {touched.lastName && errors.lastName ? <Text style={{ color: 'black' }}>{errors.lastName}</Text> : null}

        <Button  onPress={handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
);
