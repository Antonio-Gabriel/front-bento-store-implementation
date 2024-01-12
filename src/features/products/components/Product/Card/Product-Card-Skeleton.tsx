import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

export function ProductCardSkeleton() {
  return (
    <>
    {Array(6)
      .fill(0)
      .map((_, index) => (
        <SkeletonTheme baseColor="#202020" highlightColor="#444" key={index}>
          <div className={`flex flex-col items-start gap-y-4 col-span-1`}>
            <div className="w-full h-auto rounded-lg bg-card flex-center">
              <Skeleton width="450px" height={315} />
            </div>

            <div className="w-full flex justify-between items-start">
              <div className="flex flex-col items-start gap-y-2">
                <span className="text-sm"><Skeleton width="500px" height={30} /></span>
                <div className="flex items-center gap-x-2">
                  <h5 className="font-bold"></h5>        
                </div>            
              </div>
              
            </div>
          </div>
        </SkeletonTheme>  
      )) }
    </>
  )
}