<x-app-layout>


    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    <h1 class="text-2xl font-bold mb-4">Usuarios</h1>

                    <button id="openModal"
                        class="bg-blue-700 hover:bg-blue-900 block my-5 text-white font-bold py-2 px-4 rounded">
                        Nuevo Usuario
                    </button>

                    <input type="text" id="search" placeholder="Buscar por nombre o correo">

                    <table class="table-fixed">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">Id</th>
                                <th class="w-1/2 px-4 py-2">Nombre</th>
                                <th class="w-1/4 px-4 py-2">Correo</th>
                                <th class="w-1/4 px-4 py-2">Fecha de Creacion</th>
                                <th class=" px-4 py-2">Opciones</th>
                            </tr>
                        </thead>
                        <tbody id="users-table">

                        </tbody>
                    </table>

                    <div class="flex flex-row gap-2 my-2" id="pagination-links">
                        <!-- Pagination links will be populated here -->
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div id="myModal"
        class="fixed inset-0 z-50 hidden  items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div class="relative lg:w-96  my-6 mx-auto max-w-3xl">
            <!-- Contenido del modal -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex justify-end">
                    <!-- Botón para cerrar el modal -->
                    <button id="closeModal" class="text-gray-400 hover:text-gray-800 focus:outline-none">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <!-- Contenido del modal -->
                <div class="mt-4">

                    {{-- Crear un nuevo usuario --}}


                    <form id="form-users">

                        <div class="my-3">
                            <label class="block" for="nombre">Nombre</label>
                            <input class="w-full" id="nombre" type="text" placeholder="Nombre del usuario">
                        </div>
                        <div class="my-3">
                            <label class="block" for="correo">Correo</label>
                            <input class="w-full" id="correo" type="text" placeholder="Correo Electronico">
                        </div>
                        <div class="my-3">
                            <label class="block" for="contraseña">Contraseña</label>
                            <input class="w-full" id="contraseña" type="text" placeholder="Correo Electronico">
                        </div>

                        <div class="my-3">
                            <select id="rol" class="w-full p-2">
                                <option selected value="">Selecciona un rol</option>
                                <option value="1">Administrador</option>
                                <option value="2">Usuario</option>
                            </select>
                        </div>

                        <button id="actualizar-guardar"
                            class="bg-blue-700 hover:bg-blue-900 block my-5 text-white font-bold py-2 px-4 rounded">

                            Guardar
                        </button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>

@vite(['resources/js/users.js'])
