import { Fragment } from 'react';
import { SkeletonBlock, SkeletonAvatar, SkeletonText } from 'skeleton-elements/react';
import "skeleton-elements/skeleton-elements.css";

const GridCards = () => {
  return (
    <Fragment>
      <div className="grid w-full grid-cols-12 gap-5 mt-4 md:mt-0">
        <div className="col-span-12 md:col-span-4">
          <SkeletonBlock 
            height="300px"
            effect={'fade'}
            className="rounded-xl"
          /> 
        </div>

        <div className="col-span-12 md:col-span-4">
          <SkeletonBlock 
            height="300px"
            effect={'fade'}
            className="rounded-xl"
          /> 
        </div>

        <div className="col-span-12 md:col-span-4">
          <SkeletonBlock 
            height="300px"
            effect={'fade'}
            className="rounded-xl"
          /> 
        </div>

        <div className="col-span-12 md:col-span-4">
          <SkeletonBlock 
            height="300px"
            effect={'fade'}
            className="rounded-xl"
          /> 
        </div>

        <div className="col-span-12 md:col-span-4">
          <SkeletonBlock 
            height="300px"
            effect={'fade'}
            className="rounded-xl"
          /> 
        </div>

        <div className="col-span-12 md:col-span-4">
          <SkeletonBlock 
            height="300px"
            effect={'fade'}
            className="rounded-xl"
          /> 
        </div>
      </div>
    </Fragment>
  );
}

export default GridCards;
