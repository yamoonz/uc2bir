// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import trLocale from 'date-fns/locale/tr';
import enLocale from 'date-fns/locale/en-US';

import editIcon from '../../statics/svg/images/pencil.svg';
import closeIcon from '../../statics/svg/images/big-close.svg';
import styled from 'styled-components/macro';
import { Spinner } from 'react-bootstrap';

const localeMap = {
  /* set locale */
  en: enLocale,
  tr: trLocale,
};

const DateField = ({
  id,
  name,
  label,
  type,
  required = false,
  defaultValue = '',
  autoComplete = 'on',
  className = '',
  icon = false,
  onChange = () => {},
  value = '',
  onKeyUp = () => {},
  maxLength = '',
  minDate,
  maxDate,
  minYears = 13,
  disabled = false,
  settings = false,
  state = {},
  action = () => {},
}) => {
  const now = new Date();
  const defaultDate = `${now.getFullYear() - minYears}-${now.getMonth()}-${now.getDay()}`;
  
  const [selectedDate, setSelectedDate] = useState(
    new Date(value || defaultDate)
  );

  const handleDateChange = (date, callBack) => {
    const event = {
      target: {
        name: name,
        value: date,
      },
    };
    setSelectedDate(date);
    return callBack(event);
  };

  const editRef = useRef(null);
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const editShow = () => {
    if (editRef.current) {
      editRef.current.style.display = 'block';
      setLoading(true);
    }
  };
  const editClose = () => {
    if (editRef.current) {
      editRef.current.style.display = 'none';
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const save = (name, val) => {
    action(name, val);
    setTimeout(() => {
      setEdit(true);
    }, 2000);
  };

  const spinnerRef = useRef(null);
  const material = useRef();
  const textDisbled = () => {
    if (disabled) {
      return disabled;
    } else if (settings === true) {
      return edit;
    } else {
      return disabled;
    }
  };

  useEffect(() => {
    if (state.data) {
      state.isSuccess ? editClose() : editShow();
    }
  }, [state]);

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      material.current?.contains(event.target) ? editShow() : editClose();
    });
  }, [material]);
  return (
    <Materials ref={material} settings={settings} className="materials">
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap.tr}>
        <>
          <KeyboardDatePicker
            minDate={minDate}
            maxDate={maxDate}
            className={`material-inputs ${className} ${
              icon ? 'has-icon' : 'date-has-icon'
            }`}
            variant="inline"
            format="dd.MM.yyyy"
            defaultValue={defaultValue}
            name={name}
            required={required}
            label={label}
            value={selectedDate}
            onChange={(date) => handleDateChange(date, onChange)}
            disabled={textDisbled()}
            KeyboardButtonProps={{
              'aria-label': 'Tarih Gir',
            }}
          />
        </>
      </MuiPickersUtilsProvider>
      {settings && (
        <>
          <Edit
            type="button"
            ref={editRef}
            className={`${name} edit`}
            onClick={() => setEdit(!edit)}
            edit={edit}
          />
          <Save
            type="button"
            className={`${name} save`}
            onClick={() => save(name, selectedDate)}
            edit={edit}
          >
            Kaydet
          </Save>
          {loading && (
            <StyledSpinner
              className={`${name}`}
              animation="border"
              size="md"
              ref={spinnerRef}
              loading={state.isLoading}
            />
          )}
        </>
      )}
    </Materials>
  );
};

const Materials = styled.div`
  ${(props) =>
    props.settings &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-top: 30px;
      margin-bottom: 30px;
    `}
  ${(props) =>
    props.settings === 'current' &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-top: 30px;
      margin-bottom: 30px;

      .save, .edit {
        display: none!important;
      }
    `}
`;

const Save = styled.button`
  position: absolute;
  right: 50px;
  bottom: 15px;
  width: auto;
  height: 20px;
  display: ${(props) => (!props.edit ? 'inline-flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  color: var(--blue);
  font-size: 10pt;
`;

const Edit = styled.button`
  content: '';
  background: url('${(props) => (props.edit ? editIcon : closeIcon)}');
  position: absolute;
  right: 25px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  display: none;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  right: 25px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  display: ${(props) => (props.loading ? 'block' : 'none')};
`;

export default DateField;
