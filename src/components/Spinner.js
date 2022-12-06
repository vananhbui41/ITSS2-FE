import SyncLoader from 'react-spinners/SyncLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#3986BF',
};
const spinnerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5rem'
}

const Spinner = ({ loading, ...props }) => (
  <div style={spinnerStyle}>
    <SyncLoader
      color={'#3986BF'}
      loading={loading}
      cssOverride={override}
      size={20}
      {...props}
    />
  </div>
);

export default Spinner;