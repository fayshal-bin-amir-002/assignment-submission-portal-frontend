import SpinLoader from "@/components/shared/Loader/SpinLoader";

const Loader = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <SpinLoader />
    </div>
  );
};

export default Loader;
