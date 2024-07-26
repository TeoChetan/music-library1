package com.example.music_library.service;

import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class GoogleCloudStorageService {

    @Autowired
    private Storage storage;

    private final String BUCKET_NAME = "music-library_bucket";

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
        Blob blob = storage.create(blobInfo, file.getBytes());


        return String.format("https://storage.cloud.google.com/%s/%s", BUCKET_NAME,fileName);
    }
}
