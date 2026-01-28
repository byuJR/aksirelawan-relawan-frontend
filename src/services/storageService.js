import { supabase } from '../config/supabase'

/**
 * Supabase Storage Service
 * Untuk upload, download, dan delete files dari Supabase Storage
 */

export const StorageService = {
  /**
   * Upload file ke bucket
   * @param {string} bucketName - Nama bucket (contoh: 'avatars', 'photos')
   * @param {string} filePath - Path file di storage (contoh: 'user123/avatar.jpg')
   * @param {File} file - File object dari input
   * @param {object} options - Options tambahan (upsert, contentType, etc)
   */
  async uploadFile(bucketName, filePath, file, options = {}) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: options.upsert || false,
          contentType: options.contentType || file.type,
        })

      if (error) throw error
      return { data, publicUrl: this.getPublicUrl(bucketName, filePath) }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  },

  /**
   * Download file dari bucket
   * @param {string} bucketName - Nama bucket
   * @param {string} filePath - Path file di storage
   */
  async downloadFile(bucketName, filePath) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download(filePath)

      if (error) throw error
      return data // Returns blob
    } catch (error) {
      console.error('Download error:', error)
      throw error
    }
  },

  /**
   * Delete file dari bucket
   * @param {string} bucketName - Nama bucket
   * @param {string} filePath - Path file di storage
   */
  async deleteFile(bucketName, filePath) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .remove([filePath])

      if (error) throw error
      return data
    } catch (error) {
      console.error('Delete error:', error)
      throw error
    }
  },

  /**
   * List files dalam bucket
   * @param {string} bucketName - Nama bucket
   * @param {string} folderPath - Path folder (optional)
   */
  async listFiles(bucketName, folderPath = '') {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(folderPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        })

      if (error) throw error
      return data
    } catch (error) {
      console.error('List error:', error)
      throw error
    }
  },

  /**
   * Get public URL untuk file
   * @param {string} bucketName - Nama bucket
   * @param {string} filePath - Path file di storage
   */
  getPublicUrl(bucketName, filePath) {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)
    
    return data.publicUrl
  },

  /**
   * Create signed URL (untuk private files)
   * @param {string} bucketName - Nama bucket
   * @param {string} filePath - Path file di storage
   * @param {number} expiresIn - Expire time in seconds (default 3600 = 1 hour)
   */
  async createSignedUrl(bucketName, filePath, expiresIn = 3600) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresIn)

      if (error) throw error
      return data.signedUrl
    } catch (error) {
      console.error('Signed URL error:', error)
      throw error
    }
  },

  /**
   * Update file (replace existing)
   * @param {string} bucketName - Nama bucket
   * @param {string} filePath - Path file di storage
   * @param {File} file - File object baru
   */
  async updateFile(bucketName, filePath, file) {
    return this.uploadFile(bucketName, filePath, file, { upsert: true })
  },

  /**
   * Move/Rename file
   * @param {string} bucketName - Nama bucket
   * @param {string} fromPath - Path file lama
   * @param {string} toPath - Path file baru
   */
  async moveFile(bucketName, fromPath, toPath) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .move(fromPath, toPath)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Move error:', error)
      throw error
    }
  },

  /**
   * Copy file
   * @param {string} bucketName - Nama bucket
   * @param {string} fromPath - Path file source
   * @param {string} toPath - Path file destination
   */
  async copyFile(bucketName, fromPath, toPath) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .copy(fromPath, toPath)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Copy error:', error)
      throw error
    }
  },

  /**
   * Create bucket (admin only)
   * @param {string} bucketName - Nama bucket baru
   * @param {object} options - Bucket options (public, fileSizeLimit, etc)
   */
  async createBucket(bucketName, options = {}) {
    try {
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: options.public || false,
        fileSizeLimit: options.fileSizeLimit || null,
        allowedMimeTypes: options.allowedMimeTypes || null,
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Create bucket error:', error)
      throw error
    }
  },

  /**
   * List all buckets
   */
  async listBuckets() {
    try {
      const { data, error } = await supabase.storage.listBuckets()
      if (error) throw error
      return data
    } catch (error) {
      console.error('List buckets error:', error)
      throw error
    }
  },
}

// Named exports for convenience
export const uploadFile = StorageService.uploadFile.bind(StorageService)
export const downloadFile = StorageService.downloadFile.bind(StorageService)
export const deleteFile = StorageService.deleteFile.bind(StorageService)
export const listFiles = StorageService.listFiles.bind(StorageService)
export const getPublicUrl = StorageService.getPublicUrl.bind(StorageService)
export const createSignedUrl = StorageService.createSignedUrl.bind(StorageService)
export const updateFile = StorageService.updateFile.bind(StorageService)
export const moveFile = StorageService.moveFile.bind(StorageService)
export const copyFile = StorageService.copyFile.bind(StorageService)
export const createBucket = StorageService.createBucket.bind(StorageService)
export const listBuckets = StorageService.listBuckets.bind(StorageService)

export default StorageService
