import { loadingIndicator } from '../contents/LoadingIndicator';
const LoadingIndicator = () => (
  <span data-testid={loadingIndicator.testid} className='loader'></span>
);

export default LoadingIndicator;
