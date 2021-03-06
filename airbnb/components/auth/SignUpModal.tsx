import React, { useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import Input from "../common/Input";
import palette from "../../styles/palette";
import Selector from "../common/Selector";
import { dayList, monthList, yearList } from "../../lib/staticData";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;

    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }

    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }

    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
`;

const SignUpModal = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [birthYear, setBirthYear] = useState("???");
  const [birthMonth, setBirthMonth] = useState("???");
  const [birthDay, setBirthDay] = useState("???");

  const dispatch = useDispatch();

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const onChangeLastname = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(evt.target.value);
  };

  const onChangeFirstname = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(evt.target.value);
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const onChangeBirthYear = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(evt.target.value);
  };

  const onChangeBirthMonth = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(evt.target.value);
  };

  const onChangeBirthDay = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(evt.target.value);
  };

  const onSubmitSignUp = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth.replace("???", "")}-${birthDay}`
        ).toISOString(),
      };

      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" />

      <div className="input-wrapper">
        <Input
          placeholder="????????? ??????"
          type="email"
          name="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>

      <div className="input-wrapper">
        <Input
          placeholder="??????(???: ??????)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
        />
      </div>

      <div className="input-wrapper">
        <Input
          placeholder="???(???: ???)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
        />
      </div>

      <div className="input-wrapper">
        <Input
          placeholder="????????????"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>

      <p className="sign-up-birthday-label">??????</p>
      <p className="sign-up-modal-birthday-info">
        ??? 18??? ????????? ????????? ???????????? ????????? ??? ????????????. ????????? ??????
        ??????????????? ??????????????? ???????????? ????????????.
      </p>

      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={["???"]}
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>

        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={["???"]}
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>

        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={["???"]}
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </div>

      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">????????????</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;
