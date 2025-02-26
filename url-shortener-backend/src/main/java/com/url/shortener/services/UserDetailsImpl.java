package com.url.shortener.services;

import com.url.shortener.models.User;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Provides Implementation of Spring security UserDetails
 */

@Getter
@Setter
@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {

    @Serial
    private static final long serialVersionUID = 1L;
    @NonNull
    private Long id;
    @NonNull
    private String username;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private Collection<? extends GrantedAuthority> authorities;

    /**
     * Converts a user object from our mysql db to a UserDetail object of spring security
     * @param user User Model from Database
     * @return UserDetailsIm
     */
    public static UserDetails build(User user) {

        // specifies the role -> USER/ADMIN/etc...
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                Collections.singleton(authority));
    }

    // Return the authorities to spring security, without this @preauthorize won't work
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }
}
