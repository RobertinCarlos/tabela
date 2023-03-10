import React, { useState } from 'react'
import { api } from '../../utils/api'

interface Props{
    AnoMat: {
      posibleMaterias: any[]
    } | null | undefined,
    id: string,
}

function AddMat({AnoMat, id}: Props) {
    const {data: AllMats, isLoading: AllMatsLoading} = api.Commons.GetAllMaterias.useQuery()
    const [matName, setMatName] = useState<string>("")
    // const _delete = api.Admin.DeleteMat.useMutation()

    const create = api.Admin.CreateMat.useMutation()
    const addMat = api.Admin.AddMat.useMutation()

  return (
    <div className='flex flex-col w-full items-center justify-between h-96'>
        <div className='flex flex-row w-full flex-wrap items-start px-4 h-fit gap-2 overflow-y-scroll'>
            {AllMats?.map((m,i) => (
                !AnoMat?.posibleMaterias.some(ma => ma.materias == m.materias) &&
                <button key={i} onClick={(e) => {
                    addMat.mutate({ AnoId:id, MatId:m.id })
                    const btn = e.target as HTMLButtonElement
                    btn.hidden = true
                }} className="bg-gray-800/40 opacity-40 hover:opacity-80 transition-all
                py-2 px-4 w-fit h-fit rounded-sm flex">
                    <p>{m.materias}</p>
                    {/* <button className='flex h-6 w-6 justify-center items-center group relative' onClick={() => _delete.mutate({ id })}>
                        <div className='group-hover:opacity-60 rounded-full opacity-0
                        w-4 h-4 transition-all bg-white/20'/>
                        <div className='h-0.5 w-3 bg-red-500 absolute'/>
                    </button> */}
                </button>
            ))}
        </div>

        <div className='flex-row-reverse flex items-center gap-4'>
            <input placeholder='nome da materia' onChange={(e) => setMatName(e.target.value)}
            className="text-white bg-transparent border-b border-b-white/40 outline-none"/>
            <button onClick={() => {
                if(AllMats?.some(m => m.materias == matName)) return
                create.mutate({ name: matName })
            }} className="bg-gray-800/40 opacity-60 hover:opacity-100 transition-all hover:text-green-500/60
            py-2 px-4 w-fit h-fit rounded-md">Criar Materia</button>
        </div>
    </div>
  )
}

export default AddMat