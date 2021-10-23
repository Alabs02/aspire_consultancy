import { Fragment } from 'react'
import { SkeletonBlock } from 'skeleton-elements/react';
import "skeleton-elements/skeleton-elements.css";
import './TableLoader.css';

const TableLoader = () => {
  return (
    <Fragment>
      <div className="w-100 table__loader mb-5">
        <SkeletonBlock className="mb-2 hover:shadow shadow-sm" height={55} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mb-2" height={40} effect={"fade"} />
        <SkeletonBlock className="mt-2" height={55} effect={"fade"} />
      </div>
    </Fragment>
  );
}

export default TableLoader;