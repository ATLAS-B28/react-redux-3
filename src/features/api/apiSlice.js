import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//default folder name is api in rtk query
//this is a api slice
//we create methods to interact with api
//and essentially replace axios and others
//and pulls that logic's code from component
//and into this apiSlice file
export const apiSlice = createApi({
  //Creates a service to use in your application.
  // Contains only the basic redux logic (the core module).
  reducerPath: "api", //default path
  baseQuery: fetchBaseQuery(
    /**This is a very small 
   wrapper around fetch that aims
   to simplify requests.*/
    { baseUrl: "  http://localhost:3001" }
  ),
  tagTypes:['Todos'],
  endpoints /**Endpoints are 
   just a set of operations 
   that you want to perform against 
   your server. You define them as 
   an object using the builder syntax.
    There are two basic endpoint
    types: query and mutation.
    */: (builder) => ({
    getTodos: builder.query(
      /**An endpoint definition that 
        * retrieves 
        data, and may provide tags 
        to the cache.*/
      {
        query: () => "/todos",
        transformResponse:res=>res.sort((a,b)=>b.id - a.id),
        providesTags:['Todos']
      }
    ),
    addTodo: builder.mutation(
      /**An endpoint definition
         that alters data on the server or will 
         possibly invalidate the cache.*/
      {
        query: (todo) => ({
          url: "/todos",
          method: "POST",
          body: todo,
        }),
        invalidatesTags: ["Todos"],
      }
    ),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deletTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});
//rtk query can create custom hooks
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeletTodoMutation,
} = apiSlice;
