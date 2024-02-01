import { useForm } from "react-hook-form";

export default function InputBox({ label, placeholder, onChange, register}) {
  return (
    <>
      <div className='text-sm font-medium text-left p-2'>{label}</div>
      <input
        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:ring-1 focus:ring-blue-500 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
        placeholder={placeholder}
        onChange={onChange}
        register={register}
      ></input>
      
    </>
  );
}
