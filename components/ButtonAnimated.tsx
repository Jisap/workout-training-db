import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center px-6 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group",
  {
    variants: {
      variant: {
        primary: "min-w-[184px] py-[12px]",
        secondary: "min-w-[160px] py-[12px]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
)

export interface ButtonAnimatedProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  btnText: string
}

const ButtonAnimated = ({ btnText, className, variant, ...props }: ButtonAnimatedProps) => {
  const spanClasses = {
    primary: "w-72 h-72 bg-[#0563f0]",
    secondary: "w-64 h-64 bg-[#00fa2a]",
  }

  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent via-accent_secondary to-accent"></span>
      <span
        className={cn(
          "absolute bottom-0 right-0 block mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 rounded-full opacity-30 group-hover:rotate-90 ease",
          variant && spanClasses[variant],
        )}
      ></span>
      <span className="relative text-white text-sm uppercase tracking-[1px]">
        {btnText}
      </span>
    </button>
  )
}

export default ButtonAnimated