import { loadingIndicator } from '../constants/LoadingIndicator';

function LoadingIndicator() {
  return <span data-testid={loadingIndicator.testid} className='loader'></span>;
}

export default LoadingIndicator;
