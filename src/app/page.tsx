'use client'

import {SubmitHandler, useForm, Controller} from 'react-hook-form'
import {TypeOf, z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import Dropzone from 'react-dropzone'
import {cn} from 'common/helpers'
import {useState} from 'react'

const schema = z.object({
  file: z.instanceof(File)
})

type Values = TypeOf<typeof schema>

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {handleSubmit, control} = useForm<Values>({ resolver: zodResolver(schema) })

  const handleFileSubmit: SubmitHandler<Values> = async ({file}) => {
    const formData = new FormData()
    formData.append('file', file)

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
  }

  return (
    <div className="flex items-center justify-center h-full">
      <form
        className="grid gap-y-4 p-6 rounded-xl bg-white w-96"
        onSubmit={handleSubmit(handleFileSubmit)}
      >
        <Controller
          control={control}
          name="file"
          render={({field: {value, onChange}}) => (
            value ? (
              <div className="grid p-4 border-dashed border-2 rounded-lg">
                <div>{value.name}</div>
              </div>
            ) : (
              <Dropzone
                onDrop={files => onChange(files[0])}
                accept={{application: [".csv"]}}
              >
                {({getRootProps, getInputProps, isDragActive}) => (
                  <div
                    {...getRootProps()}
                    className={cn(
                      'flex items-center justify-center border-4 p-10 rounded-lg border-dashed border-gray-300 cursor-pointer',
                      'transition-all active:scale-95 active:border-black group',
                      {'scale-95 border-black': isDragActive}
                    )}
                  >
                    <input {...getInputProps()}/>
                    <p
                      className={cn(
                        'text-center text-lg font-medium text-gray-400',
                        'transition-colors select-none group-active:text-black',
                        {'text-black': isDragActive}
                      )}
                    >
                      {`Drag'n'drop file here`}
                    </p>
                  </div>
                )}
              </Dropzone>
            )
          )}
        />

        <button
          type="submit"
          className={cn(
            'bg-black rounded-lg px-3 py-2 font-medium text-white text-lg',
            'transition-transform active:scale-95',
          )}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Home
