const Skeleton = ({ className, isWhiteLoader = false }) => {
  return (
    <div
      className={`skeletonLoader ${className} ${
        isWhiteLoader ? "whiteLoader" : "darkLoader"
      }`}
    />
  );
};

export default Skeleton;
