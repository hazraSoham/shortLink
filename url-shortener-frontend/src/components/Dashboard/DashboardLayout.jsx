import React, { useState } from 'react'
import Graph from './Graph'
import { dummyData } from '../../DummyData/data'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchTotalClicks, useFetchMyShortUrls } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import ShortenUrlList from './ShortenUrlList'
import { Link } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading'

const Dashboard = () => {
  // const refetch = false;
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);
  const navigate = useNavigate();

  // console.log(useFetchTotalClicks(token, onError));

  // destructure the query hook
  const { isLoading, data: myurls, refetch  } = useFetchMyShortUrls(token, onError);
  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(token, onError);

  function onError() {
    navigate('/error');
  }

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {loader ? (
        <Loading/>
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className=" h-96 relative ">

            {totalClicks.length === 0 && (
              <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600 ">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}

            <Graph graphData={totalClicks} />
          </div>

          <div className='py-5 sm:text-end text-center'>
            <button
              // className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
              //   hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              className='px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold border-2 
                   hover:bg-blue-400 hover:border-transparent transition-colors'
              onClick={() => setShortenPopUp(true)}>
              Create a New Short URL
            </button>
          </div>

          <div>
            {!isLoading && myurls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                  <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                    You haven't created any short link yet
                  </h1>
                  <Link className="text-blue-500 sm:text-xl text-sm " />
                </div>
              </div>
            ) : (
              <ShortenUrlList urls={myurls}/>
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  )
}

export default Dashboard