import type { FetchDataResponse } from '../utils/fetchInitialData';
import { fetchData } from '../utils/fetchInitialData';
import HomePage from './NewComponents/Main';

const page = async () => {
  const data = await fetchData();
  if (data) {
    const { recentSearchess, recentSignupp, heroImg }: FetchDataResponse = data;

    return (
      <>
        {<HomePage topProfiles={recentSignupp}
          recentProfiles={recentSearchess} imageUrls={heroImg} />}
      </>
    )
  } else {
    console.log("Error while Fetching Data..");
  }
}

export default page