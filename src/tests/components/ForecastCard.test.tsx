import { render } from "@testing-library/react"
import ForecastCard from "src/components/ForecastCard"



it('Should render the max temperature', async () => {
    render(<ForecastCard />);

})