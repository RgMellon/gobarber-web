import React, { useState, useRef, useEffect } from 'react';

import { useField } from '@rocketseat/unform';
import api from '~/services/api';
/**
 *  um react hook que possibilita criar os fields
 */

import { Container } from './styles';

export default function AvatarInput() {
  const ref = useRef();

  /**
   * Esse avatar é o nome usado no redux, ele pega de la automaticamente
   */
  const { defaultValue, registerField } = useField('avatar');

  const [fileId, setFileId] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  /**
   * Avisar ao unform que esse input existe
   */
  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFileId(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt="Profile"
        />

        <input
          type="file"
          name=""
          id="avatar"
          data-file={fileId}
          accept="image/*"
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
