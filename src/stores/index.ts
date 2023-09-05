import { create}  from 'zustand'
import CreateMarbleGameSlice, { MarbleGameSlice } from './marbleGameSlice'
import { subscribeWithSelector } from 'zustand/middleware'


const useR3fStore = create<MarbleGameSlice>()((...a) => ({
  ...subscribeWithSelector(CreateMarbleGameSlice)(...a),
}))

export default useR3fStore