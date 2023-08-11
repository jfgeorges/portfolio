import { FULL_NAME } from "../../lib/config";

export const HeroSection = () => {
  return (
    <div className="relative m-auto flex w-full max-w-4xl flex-col items-center md:flex-row">
      <img
        width={300}
        height={300}
        src="/images/avatar.jpg"
        alt="avatar"
        className="-right-8 -top-6 rounded shadow-lg md:absolute"
      />
      {/* Hero - Exercise*/}
      <div className="z-0 flex flex-col gap-4">
        {/* Hero - Exercise*/}
        <h1 className="text-6xl drop-shadow-[0_0px_20px_rgba(0,0,0,0.25)] md:text-8xl">
          I'm{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-extrabold text-transparent">
            {FULL_NAME}
          </span>
        </h1>
        <p className="max-w-xl text-xl">
          <b>Apprenti React.</b> I’m a software developer that make thing on
          internet, very happy to see your here, place holder please fill
          something here please fill something here.
        </p>
      </div>
    </div>
  );
};
