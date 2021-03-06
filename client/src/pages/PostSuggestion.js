import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiCornerDownRight } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

const PostSuggestion = () => {
  const [formData, setFormData] = useState({
    topic: '',
    content: ``,
  });

  const { topic, content } = formData;

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  // Handler for post request
  const onSubmit = (e) => {
    e.preventDefault();

    //  Auth headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/suggestions/create`,
        { topic, content },
        config,
      )
      .then(res => {
        setLoading(false);
        window.scrollTo(0, 0);
        toast.success('Suggestion sent successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setFormData({
          topic: '',
          content: ``,      
        })
      })
      .catch(err => {
        setLoading(false);
        window.scrollTo(0, 0);
        toast.error('Error sending suggestion!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    };


  return (
    <>
    <div className="p-4 p-md-5 text-light bg-primary">
      <div className="col-md-12 px-0">
        <h1 className="text-white">Suggestion request</h1>
        <h6 className="my-3 mt-5 text-white">Your suggestion help us to improve our webstite, links, articles or any query.</h6>
        <p className="mb-0"><Link to='/suggestions' className="text-white">Suggestions <FiCornerDownRight /></Link></p>
      </div>
    </div>
    <div className='d-flex justify-content-center'>
    <form className="form-group col-md-9 align-items-center mt-5" onSubmit={e => onSubmit(e)}>
      <h4 className='mb-0'>Make your suggestion<FiCornerDownRight /></h4>
      <ToastContainer />
      -
      <input
        className="form-control mt-3"
        name="topic"
        type="text"
        minLength='4'
        placeholder="Your topic"
        onChange={e => onChange(e)}
        value={topic}
        required
      />
      <textarea
        className="form-control mt-3"
        name="content"
        minLength='20'
        placeholder="Content"
        onChange={e => onChange(e)}
        value={content}
        required
      />
      <br />
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Send
        </button>
      )}
      -
    </form>
    </div>
    </>
  );
};

export default PostSuggestion;