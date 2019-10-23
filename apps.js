Vue.component('todo',{
  template: `
    <div>
      <!-- judul -->
      <b id="judul">Vue ToDo List</b>
      <!-- tempat mengetikkan kegiatan -->
      <input type="text" 
        v-model="baru" 
        @keyup.enter='tambah' 
        id="baru" 
        placeholder="ketik kegiatan, lalu tekan enter" 
      />
      <!-- daftar list yang telah diketikkan -->
      <i>daftar yang telah dibuat :</i>
      <li v-for='(t, index) in tugas'>
        <!-- tombol cek, menandai list -->
        <button 
          @click='selesai(index, t.status)' 
          :value='t.cek' 
          class="button ceklisan">
        </button>
        <!-- item list -->
        <input type="text" 
          class="todo" 
          :class='garis[index]' 
          :disabled='t.dis' 
          :value='t.kegiatan' 
          v-model="t.kegiatan" />
        <!-- tombol edit list -->
        <button 
          @click='edit(index, t.dis)' 
          class="button kanan editan">
        </button>
        <!-- tombol hapus list -->
        <button @click='hapus(index)' 
          class="button kanan hapusan">
        </button>
      </li>
      <!-- tombol untuk menghapus sebagian atau seluruh list -->
      <div>
        <button @click='hapusselesai' 
          class="hapus">
          Hapus kegiatan yang telah diceklis
        </button>
        <button @click='hapussemua' 
          class="hapus selesai">
          Hapus semua Kegiatan
        </button>
      </div>
    </div>
  `,
  data(){
    return{
      tugas: [],
      garis: [],
      baru: ''
    }
  },
  methods: {
    tambah() {
      if (this.baru == '') {
        alert('Silakan diisi dulu')
      } else {
        this.tugas.push({
          kegiatan: this.baru,
          cek: false,
          status: 'belum selesai',
          dis: true
        })
      }
      this.baru = ''
    },
    selesai(index, nilai) {
      if (nilai == 'belum selesai') {
        this.tugas[index].cek = true,
          this.garis[index] = 'garis1',
          this.tugas[index].status = 'selesai'
      } else {
        this.tugas[index].cek = false,
          this.garis[index] = 'garis2',
          this.tugas[index].status = 'belum selesai'
      }
    },
    edit(index, val) {
      if (val == true) {
        this.tugas[index].dis = false
      } else {
        this.tugas[index].dis = true
      }
    },
    hapus(index) {
      Vue.delete(this.tugas, index)
    },
    hapusselesai() {
      for (i = this.tugas.length - 1; i >= 0; i--) {
        if (this.tugas[i].status === 'selesai') {
          Vue.delete(this.tugas, i)
        }
        this.garis[i] = 'garis2'
      }
    },
    hapussemua() {
      this.tugas = []
    }
  }
})
var app = new Vue({
  el: '#app'
})