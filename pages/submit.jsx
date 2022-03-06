import axios from 'axios';
import React, { useState } from 'react'
import { Form, Message } from "semantic-ui-react";
import { createService } from './util/serviceActions';

const submit = () => {

  const [newService, setNewService] = useState({
    title: "",
    hours: 0,
    description: ""
  })
  const [proof, setProof] = useState(null)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(proof);

    if(name == "proof" && files.length) {
      setProof(() => files[0])
    } else{
      setNewService( (prev) => ({...prev, [name] : value}))
    }
  }

  const {title, description, hours} = newService;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let picURL;

    if (proof) {
      const formData = new FormData();
      formData.append('image', proof, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
      })
      const res = await axios.post('/api/v1/upload', formData)
      picURL = res.data.src;
      console.log(picURL);
    }

    await createService(title, hours, description, picURL, setError)

    if(!error) {
      setLoading(false)

    }
  }


  return (
    <>
      <Form style={{ margin: "5rem auto", width: "100%" }} error={error !== null} onSubmit={handleSubmit}>
        <Message 
          error
          onDismiss={() => setError(null)}
          content={error}
          header="Oops!"
        />
        <Form.Input
          fluid
          label="Service Title (keep it short but accurate)"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={title}
          required
        />
        <Form.Input
          fluid
          label="Number of Hours"
          placeholder="Hours"
          onChange={handleChange}
          name="hours"
          value={hours}
          type="number"
          min="0"
          max="50"
          required
        />
        <label htmlFor='proof'><strong>Proof</strong></label>
        <input
          type="file"
          accept="image/*"
          name="proof"
          onChange={handleChange}
        />
        <Form.TextArea
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={description}
          required
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    </>
  );
};

export default submit;