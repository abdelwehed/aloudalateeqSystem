import Button from '@mui/material/Button';

type AddUserButtonProps = {
  icon: any;
  onButtonClick: (isFormOpen: boolean) => void;
};

export default function AddUserButton(props: AddUserButtonProps) {
  const Icon = props.icon;

  return (
    <Button
      onClick={() => props.onButtonClick(true)}
      className="icon-button"
      sx={{
        '&.MuiButtonBase-root:hover': {
          backgroundColor: 'gray',
        },
      }}
    >
      <Icon sx={{ color: 'black', fontSize: 40 }} />
    </Button>
  );
}
