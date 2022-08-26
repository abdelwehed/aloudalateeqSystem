import AloudAlAteeqLogoEn from '../../assets/images/aloudAlateeqEn.png';
import AloudAlAteeqLogo from '../../assets/images/logo.png';
import AloudAlAteeqLogoAr from '../../assets/images/AloudAlAteeqAr.png';

export function LogoMixed(props: any) {
  return (
    <div className="Hello" style={props.style}>
      <img
        width={props.imgWidth || '400px'}
        alt="icon"
        src={AloudAlAteeqLogoEn}
      />
      <img
        className="auth-img-logo"
        width="30px"
        alt="icon"
        src={AloudAlAteeqLogo}
      />
      <img
        width={props.imgWidth || '400px'}
        alt="icon"
        src={AloudAlAteeqLogoAr}
      />
    </div>
  );
}
